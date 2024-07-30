from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep


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
    sleep(5)
    print("test")
    # iframe = driver.find_element_by_css_selector("iframe")
    # driver.switch_to.frame(iframe)
    # user_email = driver.find_element_by_name("user[email]")
    # user_email.send_keys(my_email)
    # password = driver.find_element_by_name("user[password]")
    # password.send_keys(my_pass)
    # login_button = driver.find_element_by_name("commit")
    # login_button.click()


if __name__ == "__main__":
    print("test")
    driver = driverGenerate()
    login(driver)
    driver.quit()
