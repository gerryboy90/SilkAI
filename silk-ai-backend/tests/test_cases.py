import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

from main import app
from database import Base, engine

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def _get_token():
    reg = client.post("/auth/register", json={
        "email": "lawyer@test.com",
        "password": "pass123",
        "full_name": "Test Barrister",
    })
    return reg.json()["access_token"]


def test_create_case():
    token = _get_token()
    with patch("routers.cases._process_case", new_callable=AsyncMock):
        response = client.post(
            "/cases/",
            json={
                "title": "Contract Dispute — Supply of Goods",
                "brief_raw": "The claimant alleges breach of contract.",
                "case_type": "Commercial",
                "jurisdiction": "England and Wales",
            },
            headers={"Authorization": f"Bearer {token}"},
        )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Contract Dispute — Supply of Goods"
    assert data["status"] == "pending"


def test_list_cases():
    token = _get_token()
    with patch("routers.cases._process_case", new_callable=AsyncMock):
        client.post(
            "/cases/",
            json={"title": "Case A", "brief_raw": "Brief content."},
            headers={"Authorization": f"Bearer {token}"},
        )
    response = client.get("/cases/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_get_case_not_found():
    token = _get_token()
    response = client.get("/cases/nonexistent-id", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 404


def test_cases_require_auth():
    response = client.get("/cases/")
    assert response.status_code == 401
