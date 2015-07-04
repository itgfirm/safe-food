#!/usr/bin/env python
# encoding: utf-8

from selenium import webdriver
from sauceclient import SauceClient
from nose.plugins.multiprocess import MultiProcess
import new, json, httplib, base64, os, time, unittest, nose


chosen_browsers = [
    ('Mac OS X 10.9', 'firefox', '32.0'),
    ('Mac OS X 10.9', 'chrome', '43.0'),
    ('Windows 8.1', 'internet explorer', '11.0'),
    ('Windows 8.1', 'firefox', '32.0'),
    ('Windows 8.1', 'chrome', '43.0'),
    ('Windows 7', 'internet explorer', '10.0'),
    ('Windows 7', 'chrome', '43.0'),
    ('Windows 7', 'firefox', '32.0')
]
user = os.environ.get('SAUCE_USERNAME')
key = os.environ.get('SAUCE_ACCESS_KEY')
buildnum = os.environ.get('TRAVIS_COMMIT')

class ManualTest(unittest.TestCase):
    # Nose won't run the original Test Class, we'll change this in the
    # dynamically generated classes
    __test__ = False

    def setUp(self):
        des_caps = {
                # The following properties are set dynamically
                'platform': self.os,
                'browserName': self.br,
                'version': self.version,
                'name': self.name,
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
        self.name = "Unknown Test"


    def test_a_d_s_b_p_a32_last_updated(self):
        self.name = "Test a32_last_updated"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_id("generalSearch").send_keys("peas")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_css_selector("h4.list-group-item-heading.ng-binding").click()
        driver.find_element_by_css_selector("div.modal-footer.ng-scope > button.btn.btn-primary").click()
        driver.find_element_by_css_selector("img.logo").click()
        self.success = True


    def test_a_d_s_b_p_a36(self):
        self.name = "Test a36"
        driver = self.driver
        driver.get("http://safe-food.herokuapp.com")
        time.sleep(10)
        driver.find_element_by_xpath("//div[3]/button").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_id("generalSearch").send_keys("pepsi")
        driver.find_element_by_css_selector("img.logo").click()
        driver.find_element_by_id("generalSearch").clear()
        driver.find_element_by_id("generalSearch").send_keys("pepsi")
        driver.find_element_by_css_selector("sapn.input-group-btn > button.btn.btn-default").click()
        driver.find_element_by_xpath("//div[2]/strong").click()
        driver.find_element_by_css_selector("div.modal-footer.ng-scope > button.btn.btn-primary").click()
        driver.find_element_by_css_selector("img.logo").click()
        self.success = True

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

    def report_pass_fail(self):
        sauce_client = SauceClient(user, key)
        sauce_client.jobs.update_job(self.driver.session_id, passed=self.success, name = self.name, build_num = buildnum)

    def tearDown(self):
        self.assertEqual([], self.verificationErrors)
        self.report_pass_fail()

        self.driver.quit()


# Here's where the magic happens
classes = {}
for os, browser, version in chosen_browsers:
    # Make a new class name for the actual test cases
    name = "%s_%s_%s_%s" % (ManualTest.__name__, os, browser, version)
    name = name.encode('ascii')
    if name.endswith("."): name = name[:-1]
    for x in ".-_":
        name = name.replace(x, " ")

    # Copy the magic __dict__ from the original class
    d = dict(ManualTest.__dict__)
    # Update the new class' dict with a new name and a __test__ == True
    d.update({'__test__': True,
              '__name__': name,
              # Set these properties dynamically, the test uses them to
              # instantiate the browser
              'name': name,
              'os': os,
              'br': browser,
              'version': version,
             })

    # append the new class to the classes dict
    classes[name] = new.classobj(name, (ManualTest,), d)

# update the global context (believe it or not, it's a dict), with the new
# classes we just dynamically generated
globals().update(classes)

# this is just handy. If __main__, just run the tests in multiple processes
if __name__ == "__main__":
    nose.core.run(argv=["nosetests", "-vv",
                        "--processes", len(chosen_browsers),
                        "--process-timeout", 180,
                        __file__],
                  plugins=[MultiProcess()])

