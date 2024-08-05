from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from google.cloud import firestore
from google.oauth2 import service_account
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
from dotenv import load_dotenv
import os
import uuid

load_dotenv(dotenv_path=".env")


def driver_generate():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--window-size=1920,1080")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


def login(driver):
    driver.get("https://www.whyq.sg/")
    sleep(2)
    wait = WebDriverWait(driver, 10)
    login_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "login")))
    login_button.click()

    email = os.getenv("EMAIL")
    password = os.getenv("PASSWORD")
    if not email or not password:
        print("Email or Password not set in environment variables.")
        return
    user_email = wait.until(EC.presence_of_element_located((By.NAME, "loginUser")))
    user_email.send_keys(email)
    user_password = wait.until(EC.presence_of_element_located((By.NAME, "loginPass")))
    user_password.send_keys(password)
    login_button = driver.find_element_by_id("loginBtn")
    login_button.click()
    sleep(1)


def get_menus(driver):
    sleep(1)  # Wait for the page to load
    menu_list = []

    # Find all meal lists
    meal_lists = driver.find_elements_by_css_selector(".rakuten_meal_list")

    for meal_list in meal_lists:
        date_string = meal_list.get_attribute("data-date")

        # Find all menu items within the meal list
        menu_items = meal_list.find_elements_by_css_selector("ul")

        for menu_item in menu_items:
            photo_url = menu_item.find_element_by_css_selector(
                "img.meal_img"
            ).get_attribute("src")
            menu_name = menu_item.find_element_by_css_selector("h6").get_attribute(
                "title"
            )

            menu_list.append(
                {
                    "photo_url": photo_url,
                    "menu_name": menu_name,
                    "date_string": date_string,
                }
            )

    return menu_list


def initialize_firestore():
    # Get the path of the Firestore connection JSON file from environment variables
    key_path = os.getenv("FIRESTORE_KEY_PATH")

    if not key_path:
        raise ValueError("FIRESTORE_KEY_PATH environment variable is not set")

    # Initialize the client using the service account key
    credentials = service_account.Credentials.from_service_account_file(key_path)
    client = firestore.Client(credentials=credentials)
    return client


def post_daily_lunch_menus(menu_list, client):
    for menu in menu_list:
        # Collection name
        collection_name = "dailyLunchMenus"

        # Generate a random document ID
        doc_id = str(uuid.uuid4())

        # Add data to Firestore
        client.collection(collection_name).document(doc_id).set(
            {
                "photo_url": menu["photo_url"],
                "menu_name": menu["menu_name"],
                "date_string": menu["date_string"],
            }
        )


def post_menu_items(menu_list, client):
    for menu in menu_list:
        # Collection name
        collection_name = "menuItems"

        # Query to check if the same menu_name already exists
        query = (
            client.collection(collection_name)
            .where("menu_name", "==", menu["menu_name"])
            .get()
        )

        # Create a new document only if the same menu_name does not exist
        if not query:
            # Generate a random document ID
            doc_id = str(uuid.uuid4())

            # Add data to Firestore
            client.collection(collection_name).document(doc_id).set(
                {
                    "menu_name": menu["menu_name"],
                    "photo_url": menu["photo_url"],
                    "review_score": 3.0,
                }
            )


if __name__ == "__main__":
    print("test")
    driver = driver_generate()
    login(driver)
    menu_list = get_menus(driver)
    client = initialize_firestore()
    post_daily_lunch_menus(menu_list, client)
    post_menu_items(menu_list, client)
    driver.quit()
