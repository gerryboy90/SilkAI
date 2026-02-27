from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

    anthropic_api_key: str = ""
    database_url: str = "sqlite:///./silk_ai.db"
    jwt_secret: str = "dev-secret-change-in-production"
    app_env: str = "development"
    log_level: str = "INFO"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440


settings = Settings()
