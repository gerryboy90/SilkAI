"""
PDF export service for Case Strategy Reports.
"""
import io
import logging
from datetime import datetime
from typing import Optional

logger = logging.getLogger(__name__)


def generate_strategy_report_pdf(case_title: str, report_data: dict, case_type: Optional[str] = None) -> bytes:
    """Generate a formatted PDF strategy report. Returns PDF bytes."""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import cm
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
        from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=2.5 * cm,
            leftMargin=2.5 * cm,
            topMargin=2.5 * cm,
            bottomMargin=2.5 * cm,
        )

        # Colour palette
        GOLD = colors.HexColor("#C9A84C")
        CHARCOAL = colors.HexColor("#1A1A1A")
        DARK_GREY = colors.HexColor("#3D3D3D")
        LIGHT_GREY = colors.HexColor("#F5F5F5")
        MID_GREY = colors.HexColor("#8A8A8A")

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            "SilkTitle",
            fontSize=22,
            textColor=CHARCOAL,
            spaceAfter=4,
            fontName="Times-Bold",
            alignment=TA_LEFT,
        )
        subtitle_style = ParagraphStyle(
            "SilkSubtitle",
            fontSize=11,
            textColor=MID_GREY,
            spaceAfter=2,
            fontName="Helvetica",
            alignment=TA_LEFT,
        )
        section_header_style = ParagraphStyle(
            "SilkSection",
            fontSize=13,
            textColor=CHARCOAL,
            spaceBefore=16,
            spaceAfter=6,
            fontName="Times-Bold",
            borderPad=4,
        )
        body_style = ParagraphStyle(
            "SilkBody",
            fontSize=10,
            textColor=DARK_GREY,
            spaceAfter=6,
            fontName="Helvetica",
            leading=15,
        )
        bullet_style = ParagraphStyle(
            "SilkBullet",
            fontSize=10,
            textColor=DARK_GREY,
            spaceAfter=4,
            fontName="Helvetica",
            leading=15,
            leftIndent=16,
            bulletIndent=4,
        )
        label_style = ParagraphStyle(
            "SilkLabel",
            fontSize=9,
            textColor=GOLD,
            spaceAfter=2,
            fontName="Helvetica-Bold",
        )

        story = []

        # Header
        story.append(Paragraph("SILK AI", ParagraphStyle("Brand", fontSize=10, textColor=GOLD, fontName="Helvetica-Bold")))
        story.append(Paragraph("Case Strategy Report", title_style))
        story.append(Paragraph(case_title, subtitle_style))
        if case_type:
            story.append(Paragraph(f"Case Type: {case_type}", subtitle_style))
        story.append(Paragraph(f"Generated: {datetime.utcnow().strftime('%d %B %Y, %H:%M UTC')}", subtitle_style))
        story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=12))

        def section(title):
            story.append(Paragraph(title, section_header_style))
            story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#DDDDDD"), spaceAfter=6))

        # 1. Recommended Argument Style
        section("1. RECOMMENDED ARGUMENT STYLE")
        style_data = report_data.get("argument_style", {})
        if style_data.get("recommended_style"):
            story.append(Paragraph(f"<b>{style_data['recommended_style']}</b>", body_style))
        if style_data.get("rationale"):
            story.append(Paragraph(style_data["rationale"], body_style))

        # 2. Known Barrister Profiles
        section("2. KNOWN BARRISTER PROFILES")
        for bp in report_data.get("barrister_profiles", []):
            story.append(Paragraph(f"<b>{bp.get('name', '')} — {bp.get('era', '')}</b>", body_style))
            story.append(Paragraph(f"<i>Known for:</i> {bp.get('known_for', '')}", body_style))
            story.append(Paragraph(f"<i>Argument style:</i> {bp.get('argument_style', '')}", body_style))
            story.append(Paragraph(f"<i>Key lessons:</i> {bp.get('key_lessons', '')}", body_style))
            story.append(Spacer(1, 8))

        # 3. Judge Ruling Prediction
        section("3. JUDGE RULING PREDICTION")
        pred = report_data.get("judge_prediction", {})
        if pred.get("prediction"):
            story.append(Paragraph(pred["prediction"], body_style))
        if pred.get("confidence") is not None:
            confidence_pct = int(float(pred["confidence"]) * 100)
            story.append(Paragraph(f"<b>Prediction confidence:</b> {confidence_pct}%", body_style))
        if pred.get("precedent_cases"):
            story.append(Paragraph("<b>Relevant precedents:</b>", label_style))
            for pc in pred["precedent_cases"]:
                story.append(Paragraph(f"• {pc}", bullet_style))

        # 4. Argument Strength Scores
        section("4. ARGUMENT STRENGTH SCORING")
        for arg in report_data.get("argument_scores", []):
            score = float(arg.get("score", 0))
            score_color = "#2D7A2D" if score >= 7 else "#C9A84C" if score >= 5 else "#B03030"
            story.append(Paragraph(
                f"<b>{arg.get('argument', '')}</b> — <font color='{score_color}'><b>{score:.1f}/10</b></font>",
                body_style,
            ))
            if arg.get("weakness"):
                story.append(Paragraph(f"<i>Weakness:</i> {arg['weakness']}", bullet_style))
            if arg.get("recommended_pivot"):
                story.append(Paragraph(f"<i>Recommended pivot:</i> {arg['recommended_pivot']}", bullet_style))
            story.append(Spacer(1, 6))

        # 5. Case Strategy Report
        section("5. CASE STRATEGY REPORT")
        strat = report_data.get("strategy_report", {})

        if strat.get("recommended_approach"):
            story.append(Paragraph("<b>Recommended Approach</b>", label_style))
            story.append(Paragraph(strat["recommended_approach"], body_style))

        if strat.get("opposition_arguments"):
            story.append(Paragraph("<b>Likely Opposition Arguments</b>", label_style))
            for oa in strat["opposition_arguments"]:
                story.append(Paragraph(f"• {oa}", bullet_style))

        if strat.get("risk_areas"):
            story.append(Paragraph("<b>Risk Areas</b>", label_style))
            for ra in strat["risk_areas"]:
                story.append(Paragraph(f"• {ra}", bullet_style))

        if strat.get("preparation_steps"):
            story.append(Paragraph("<b>Preparation Steps</b>", label_style))
            for i, ps in enumerate(strat["preparation_steps"], 1):
                story.append(Paragraph(f"{i}. {ps}", bullet_style))

        # Footer note
        story.append(Spacer(1, 24))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#DDDDDD"), spaceAfter=6))
        story.append(Paragraph(
            "This report was generated by Silk AI. All case data was anonymized prior to analysis. "
            "This document is confidential and intended solely for the named legal professional.",
            ParagraphStyle("Footer", fontSize=8, textColor=MID_GREY, fontName="Helvetica-Oblique", leading=12),
        ))

        doc.build(story)
        buffer.seek(0)
        return buffer.read()

    except ImportError:
        logger.error("ReportLab not installed — cannot generate PDF")
        raise RuntimeError("PDF generation requires reportlab to be installed")
