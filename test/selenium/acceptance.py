#!/usr/bin/env python
# encoding: utf-8

from selenium import webdriver
from sauceclient import SauceClient
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import new,json,httplib,base64,unittest,nose,time,os
from nose.plugins.multiprocess import MultiProcess



user = os.environ.get('SAUCE_USERNAME')
key = os.environ.get('SAUCE_ACCESS_KEY')
buildnum = os.environ.get('TRAVIS_COMMIT')

class OneBrowser(unittest.TestCase):
    # Nose won't run the original Test Class, we'll change this in the
    # dynamically generated classes
    __test__ = False

    def setUp(self):
        des_caps = {
                # The following properties are set dynamically
                'platform': "OS X 10.10",
                'browserName': "Firefox",
                'version': "32.0",
                'name': "TestCase",
                'locationServicesEnabled': "true",
                'autoAcceptAlerts' : 'true'
                }
        # instantiate the browser
        self.driver = webdriver.Remote(desired_capabilities=des_caps,
                                       command_executor="http://%s:%s@ondemand.saucelabs.com:80/wd/hub"
                                       % (user, key))
        # this is just handy
        self.driver.implicitly_wait(30)
        self.base_url = "http://safe-food.herokuapp.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
        self.success = False
        self.name = "TestCase"


    def test_adsbp68(self):
        self.name = "ADSBPA-68"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_xpath("//img[@alt='Home']").click()
        self.success = True

    def test_adsbpa33(self):
        self.name = "ADSBPA-33"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        self.success = True

    def test_adsbpa37(self):
        self.name = "ADSBPA-37"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com/#/food-recall-search")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        Select(driver.find_element_by_id("healthHazardLevel")).select_by_visible_text("Class I")
        el = driver.find_element_by_id('currentStatus')
        for option in el.find_elements_by_tag_name('option'):
            if option.text == 'Ongoing':
              option.click() # select() in earlier versions of webdriver
              break
        Select(driver.find_element_by_id("dateRange")).select_by_visible_text("Last 7 Days")
        Select(driver.find_element_by_id("dateRange")).select_by_visible_text("All Records")
        driver.find_element_by_name("generalSearch").clear()
        driver.find_element_by_name("generalSearch").send_keys("banana")
        driver.find_element_by_xpath("//form[@id='navSearchId']/div/span/button").click()
        self.success = True

    def test_adsbpa59(self):
        self.name = "ADSBPA-59"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com/")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_id("generalSearch").send_keys("peas")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        self.success = True

    def test_adsbpa66(self):
        self.name = "ADSBPA-66"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com/")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_name("generalSearch").send_keys("banana")
        driver.find_element_by_xpath("//form[@id='navSearchId']/div/span/button").click()

        self.success = True

    def test_adsbpa47(self):
        self.name = "ADSBPA-47"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com/")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()

        self.success = True

    def test_adsbpa50(self):
        self.name = "ADSBPA-50"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com/")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()

        self.success = True


    def report_pass_fail(self):

        sauce_client = SauceClient(user, key)
        sauce_client.jobs.update_job(self.driver.session_id, passed=self.success, name = self.name, build_num = buildnum)

    def tearDown(self):
        self.assertEqual([], self.verificationErrors)
        self.report_pass_fail()
        self.driver.quit()


if __name__ == "__main__":
     unittest.main()

