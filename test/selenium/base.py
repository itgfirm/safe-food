# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re, os
class Firsttest(unittest.TestCase):
    def setUp(self):
        SAUCE_USERNAME = os.environ.get('SAUCE_USERNAME')
	SAUCE_ACCESS_KEY = os.environ.get('SAUCE_ACCESS_KEY')
	desired_capabilities = {
            'platform': "Mac OS X 10.9",
            'browserName': "chrome",
            'version': "31",
            'name': "TESTING"
	}
        sauce_url = "http://%s:%s@ondemand.saucelabs.com:80/wd/hub"
        self.driver = webdriver.Remote(desired_capabilities=desired_capabilities, command_executor=sauce_url % (SAUCE_USERNAME, SAUCE_ACCESS_KEY))
        self.driver.implicitly_wait(30)
        self.base_url = "https://safe-food.herokuapp.com/"
        self.verificationErrors = []
        self.accept_next_alert = True


    def test_first(self):
        driver = self.driver
        driver.get("https://safe-food.herokuapp.com")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//a[contains(text(),'View Enforcement Reports')]"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//a[contains(text(),'View Enforcement Reports')]").click()
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//input[@id='input_6']"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//input[@id='input_6']").clear()
        driver.find_element_by_xpath("//input[@id='input_6']").send_keys("Spinach MI")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/button"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_xpath("//md-dialog/div/button").click()
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//md-card[9]/md-card-content/h2"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True

    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException, e: return False
        return True

    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
