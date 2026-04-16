//export const API_URL = "http://13.62.214.254:8080";
//export const API_URL = "http://185.227.108.14:8080";
//export const API_URL = "http://192.168.0.187:8080";

/*
Всерівно не допомогло, давай я тобі напишу перший рядок помилки(і то не повністю бо він довгий):
java.lang.NoSuchMethodError: No virtual method getStaticAsyncFunction()Ljava/util/Map; in class Lexpo/modules/kotlin/classcomponent/ClassComponentBuilder; or its super classes (declaration of 'expo.modules.kotlin.classcomponents.ClassComponentBuilder' appears in /data/app/ ~~HiazUKHAJby7IB0NgY8UAg==/com.cinelink.app-EuLHn9GlrCw3mG0dEzm6jg==/base.apk!classes2.dex)
*/

export const API_URL = `${process.env.EXPO_PUBLIC_API_URL}`