import unittest
from fastapi.testclient import TestClient
from server.main import app

class TestSecurity(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_create_malicious_url_scheme(self):
        """Test that URLs with non-http/https schemes are rejected."""
        response = self.client.post(
            "/urls/",
            json={"original_url": "javascript:alert('XSS')", "custom_slug": "xss-test"}
        )
        self.assertEqual(response.status_code, 422, "Should reject javascript: scheme")

    def test_create_invalid_url(self):
        """Test that invalid URLs are rejected."""
        response = self.client.post(
            "/urls/",
            json={"original_url": "not-a-url", "custom_slug": "invalid-url-test"}
        )
        self.assertEqual(response.status_code, 422, "Should reject invalid URL")

    def test_create_malicious_slug(self):
        """Test that slugs with special characters are rejected."""
        response = self.client.post(
            "/urls/",
            json={"original_url": "https://example.com", "custom_slug": "invalid/slug"}
        )
        self.assertEqual(response.status_code, 422, "Should reject slug with slash")

        response = self.client.post(
            "/urls/",
            json={"original_url": "https://example.com", "custom_slug": "<script>"}
        )
        self.assertEqual(response.status_code, 422, "Should reject slug with special chars")

    def test_create_valid_url(self):
        """Test that valid URLs are accepted."""
        response = self.client.post(
            "/urls/",
            json={"original_url": "https://google.com", "custom_slug": "valid-slug"}
        )
        # Note: This might fail if the slug "valid-slug" is already taken in the persistent DB.
        # Ideally tests should run against a fresh test DB or clean up after themselves.
        # But for checking status code vs 422, it's fine.
        # If it returns 200 or 400 (slug taken), it means it passed validation.
        self.assertNotEqual(response.status_code, 422, "Should pass validation for valid URL")

if __name__ == "__main__":
    unittest.main()
