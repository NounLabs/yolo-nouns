import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:mobileapp/app/colors.dart';
import 'package:mobileapp/app/const_names.dart';
import 'package:mobileapp/screens/home_screen.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  await FirebaseMessaging.instance
      .subscribeToTopic(NotificationTopics.fiveMinutesBeforeEnd);
  await FirebaseMessaging.instance
      .subscribeToTopic(NotificationTopics.onAuctionEnd);

  print(await FirebaseMessaging.instance.getToken());
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of the application.
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(390, 844),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: () => MaterialApp(
        builder: (context, widget) {
          ScreenUtil.setContext(context);
          return MediaQuery(
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0),
            child: widget!,
          );
        },
        title: 'Fomo Nouns',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          fontFamily: AppFonts.inter,
          primaryColor: AppColors.textColor,
          backgroundColor: AppColors.warmBackground,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => const HomeScreen(),
        },
      ),
    );
  }
}
