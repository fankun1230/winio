package com.fankun.factory.controller;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fankun.factory.controller.Selenium.WinIo;

@RestController
public class TestController {

	@RequestMapping("/test")
	public String test() throws Exception{
		System.setProperty("webdriver.ie.driver", "C:\\Program Files\\Internet Explorer\\IEDriverServer.exe");
		  DesiredCapabilities ieCapabilities = DesiredCapabilities.internetExplorer();
		    ieCapabilities.setCapability(InternetExplorerDriver.INTRODUCE_FLAKINESS_BY_IGNORING_SECURITY_DOMAINS,true);
		    
		    WebDriver driver = new InternetExplorerDriver(ieCapabilities);
		  //  driver.manage().timeouts().implicitlyWait(1000, TimeUnit.SECONDS);
		 //driver.get("https://ipcrs.pbccrc.org.cn/page/login/loginreg.jsp");
		 driver.get("http://127.0.0.1:9098/bootFactory/index");
		 //loginNameInfo passwordInfo _@IMGRC@_
		 String aaa = driver.getPageSource();
		 System.out.println(aaa);
//		 WebElement loginBtn=driver.findElement(By.id("username"));
//		 loginBtn.click();
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
			return "succ";
	}
}
