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
    sleep(1)


def getMenus(driver):
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
            menu_name = menu_item.find_element_by_css_selector("h6 a").text

            menu_list.append(
                {
                    "photo_url": photo_url,
                    "menu_name": menu_name,
                    "date_string": date_string,
                }
            )

    return menu_list


if __name__ == "__main__":
    print("test")
    driver = driverGenerate()
    login(driver)
    menu_list = getMenus(driver)
    driver.quit()
