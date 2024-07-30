from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="./batch/.env")


def driverGenerate():
    chrome_options = Options()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--window-size=1920,1080")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


def login(driver):
    driver.get("https://www.whyq.sg/")
    sleep(2)
    login_button = driver.find_element_by_class_name("login")
    login_button.click()
    sleep(1)
    email = os.getenv("EMAIL")
    password = os.getenv("PASSWORD")
    user_email = driver.find_element_by_name("loginUser")
    user_email.send_keys(email)
    user_password = driver.find_element_by_name("loginPass")
    user_password.send_keys(password)
    login_button = driver.find_element_by_id("loginBtn")
    login_button.click()
    sleep(10)


if __name__ == "__main__":
    print("test")
    driver = driverGenerate()
    login(driver)
    driver.quit()
