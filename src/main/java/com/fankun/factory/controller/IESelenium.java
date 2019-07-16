package com.fankun.factory.controller;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.Select;

import com.fankun.factory.controller.Selenium.WinIo;

public class IESelenium {

	public static WebDriver getIE(String url) {
		System.setProperty("webdriver.ie.driver", "C:\\Program Files\\Internet Explorer\\IEDriverServer.exe");
	    DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();
	    ieCapabilities.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS,true);
	    ieCapabilities.setCapability("ignoreProtectedModeSettings", true);
	    WebDriver driver = new InternetExplorerDriver();
		driver.get(url);
		return driver;
	}
	
	public static void main(String[] args) throws Exception {
		 //driver.get("https://ipcrs.pbccrc.org.cn/page/login/loginreg.jsp");
		WebDriver driver = getIE("http://127.0.0.1:9098/bootFactory/index");
		 //loginNameInfo passwordInfo _@IMGRC@_
		 WebElement loginBtn=driver.findElement(By.id("password"));
		 loginBtn.click();
//		 String js = "document.getElementById(\"username\").value=hhhhh";//定义一个js
//		    JavascriptExecutor jse=(JavascriptExecutor)driver;
//		      jse.executeScript(js);//执行js
		      
//		 System.out.println("ddddddddddddd");
		 System.out.println("winIO64初始化是否成功："+WinIo.Instance.InitializeWinIo());//此处应该有判断，只有初始化成功才可继续往下走，否者直接终止
           Thread.sleep(2000);
		 String s="hell0";
			for (int i = 0; i < s.length(); i++) {
				Selenium.KeyDown(Selenium.toScanCode(""+s.charAt(i)));
				Thread.sleep(10);
				Selenium.KeyUp(Selenium.toScanCode(""+s.charAt(i)));
				Thread.sleep(200);
			}
			WinIo.Instance.ShutdownWinIo();
			 System.out.println(driver.getPageSource());
			 WebElement test=driver.findElement(By.id("test"));
			 System.out.println(test.getAttribute("value"));
	}

}
