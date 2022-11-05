import unittest
import requests


class TestAPIEndpoints(unittest.TestCase):
    URL = 'http://localhost:3300'
    register_keys = ["email", "password", "name"]
   

    def test_home_page(self):
        url = self.URL + '/'
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.text, 'Login / registration API is running!')
        # print("Home page route test completed")

    def test_register(self):
        url = self.URL + '/register'
        data = ["test3@test.com", "test3", "test3"]
        payload = {key : val for  (key, val) in zip(self.register_keys, data)}
        response = requests.post(url, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True})
        # print("Register page route test completed")

    def test_register_failed(self):
        url = self.URL + '/register'
        data = ["test2@test.com", "test2", "test2"]
        payload = {key : val for  (key, val) in zip(self.register_keys, data)}
        response = requests.post(url, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': False, 
        "Error message":f"User registration failed" })
        # print("Register page route test2 completed")



if __name__ == "__main__":
    unittest.main()