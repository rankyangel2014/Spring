mkdir %1\target\%2\conf
xcopy %1\src\main\resources %1\target\%2\conf /y/s
copy %1\ServiceInterface.soa.xml %1\target\%2\conf
copy %1\target\%2.jar %1\target\%2\%2.jar