package com.fankun.factory.common;

import java.lang.reflect.Method;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;

/**
 * AES加密工具<br>
 */
public class SecUtil {

    private static byte[] keys = "1234567890abcdff".getBytes();

    /**
     * 加密
     * 
     * @param value
     * @return
     */
    public static String encrypt(String value) {
        String s = null;
        int mode = Cipher.ENCRYPT_MODE;
        try {
            Cipher cipher = initCipher(mode);

            byte[] outBytes = cipher.doFinal(value.getBytes());

            s = String.valueOf(Hex.encodeHex(outBytes));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return s;
    }

    /**
     * 解密
     * 
     * @param value
     * @return
     */
    public static String decrypt(String value) {
        String s = null;
        int mode = Cipher.DECRYPT_MODE;
        try {
            Cipher cipher = initCipher(mode);
            byte[] outBytes = cipher.doFinal(Hex.decodeHex(value.toCharArray()));

            s = new String(outBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return s;
    }

    private static Cipher initCipher(int mode) throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidKeyException {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        Key key = new SecretKeySpec(keys, "AES");
        cipher.init(mode, key);
        return cipher;
    }
    
    public static String encodeBase64(byte[]input) throws Exception{  
        Class clazz=Class.forName("com.sun.org.apache.xerces.internal.impl.dv.util.Base64");  
        Method mainMethod= clazz.getMethod("encode", byte[].class);  
        mainMethod.setAccessible(true);  
         Object retObj=mainMethod.invoke(null, new Object[]{input});  
         return (String)retObj;  
    } 
    public static byte[] decodeBase64(String input) throws Exception{  
        Class clazz=Class.forName("com.sun.org.apache.xerces.internal.impl.dv.util.Base64");  
        Method mainMethod= clazz.getMethod("decode", String.class);  
        mainMethod.setAccessible(true);  
         Object retObj=mainMethod.invoke(null, input);  
         return (byte[])retObj;  
    }  
    public static void main(String[] args) throws Exception {
//    	System.out.println(encodeBase64("014276037605".getBytes()));
//    	System.out.println(new String(decodeBase64("MDE0Mjc2MDM3NjA1")));
//    	System.exit( 0);
    	
        // Security.addProvider(new com.sun.crypto.provider.SunJCE());
//    	String password="73fa796b6c0149a1521616f2a95287c3";
//    	System.out.println(decrypt(password));
//        String line = "============================================================";
//        System.out.println(line);
//        while (true) {
//        	BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
//            try {
//                System.out.println("请输入 : ");
//                String str = in.readLine();
//                System.out.println("加密后数据  : " + str + " >>" + encrypt(str));
//                System.out.println(line);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
    	
    	
    	SecUtil encrypt = new SecUtil();
    	//String vvString = encrypt.encrypt("RE_L#tsWp@8Qja8JX&Sy-r92+R5A4)uZ");
    	String ccString = encrypt.decrypt("692ba801d04a19171f92a44469024b88");
    	//System.out.println(vvString);
    	System.out.println(ccString);
    }
    
}
