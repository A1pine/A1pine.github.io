title: Android 开发学习笔记（二）
date: 2018-12-13 20:13:47 
tags: [Android开发,Android,安卓,学习]
categories: Android应用开发
---

# AndroidManifest.xml

```cmd
 app/src/main/AndroidManifest.xml
```
安装apk时，AndroidManifest.xml是软件包安装程序读取的文件
```xml
            <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```
这些代码注册了一个活动：MainActivity 
 **所有的活动必须在AndroidManifest.xml中注册**
 所有用户可见的东西都在活动（Activity）中，其中  **intent-filter** 告诉系统 标签中的内容是主活动。
 

<!-- more --> 
----------
# 初探活动Mainactivity
```java
    package com.a1pine.mrtxn.myapplication;

    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.widget.TextView;

    public class MainActivity extends AppCompatActivity {

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Example of a call to a native method
        TextView tv = (TextView) findViewById(R.id.sample_text);
        tv.setText(stringFromJNI());
    }

    /**
    * A native method that is implemented by the 'native-lib' native library,
    * which is packaged with this application.
    */
    public native String stringFromJNI();
        }
```

MainActivity继承父类AppCompatActivity
AppCompatActivity是一种新的用来替换之前Activity的类，具有“Activity”的所有特性，且为MD设计提供了API支持。
onCreate()方法调用了setContextView()方法 给当前活动引入了一个main布局。


----------
# 初探布局
```cmd   
\app\src\main\layout\main.xml
```
看到如下代码
```xml
<?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout     xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/sample_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
    </android.support.constraint.ConstraintLayout> 
```
控制主界面上Hello World！的内容由android:text="Hello World!"定义


















































































































































































































































































