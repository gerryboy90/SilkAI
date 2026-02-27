import pytest
from fastapi.testclient import TestClient

from main import app
from database import Base, engine

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_register_and_login():
    response = client.post("/auth/register", json={
        "email": "qc@chambers.com",
        "password": "SecurePass123!",
        "full_name": "Lord Denning",
        "firm": "Denning Chambers",
    })
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "qc@chambers.com"


def test_register_duplicate_email():
    payload = {"email": "dup@test.com", "password": "pass123", "full_name": "Test User"}
    client.post("/auth/register", json=payload)
    response = client.post("/auth/register", json=payload)
    assert response.status_code == 400


def test_login_invalid_credentials():
    response = client.post("/auth/login", json={"email": "nobody@test.com", "password": "wrong"})
    assert response.status_code == 401


def test_me_requires_auth():
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_me_with_valid_token():
    reg = client.post("/auth/register", json={
        "email": "me@test.com",
        "password": "pass123",
        "full_name": "Test QC",
    })
    token = reg.json()["access_token"]
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == "me@test.com"
