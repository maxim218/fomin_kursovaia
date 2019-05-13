## -*- coding: utf-8 -*-

import sys
import urllib
import urllib2
import json
import time

reload(sys)
sys.setdefaultencoding('utf-8')

def nl():
	print("  ")

def getUrl(s):
	url = 'http://localhost:5000/' + s
	return url

def sendGet(s):
	url = getUrl(s)
	result = urllib.urlopen(url).read()
	print("GET")
	print("Url: " + url)
	print("Answer: " + result)
	return result
	
time.sleep(3)

# init database

sendGet('api/database/init');

nl()
nl()
time.sleep(3)

# add tips

tipNumber = 15

for i in range(1, tipNumber + 1):
	sendGet('api/database/tip/insert?tip_name=tip_type_' + str(i))

nl()
nl()
time.sleep(3)

# add countries

countyMaxNumber = 10

for i in range(1, countyMaxNumber + 1):
	sendGet('api/database/country/insert?country_name=country_' + str(i))
	
nl()
nl()
time.sleep(3)

# add cities

cityNumber = 15

for i in range(1, countyMaxNumber + 1):
	for k in range(1, cityNumber * i + 1):
		sendGet('api/database/city/insert?city_country_id=' + str(i) + "&city_name=city_" + str(k) + "_c_" + str(i))

nl()
nl()
time.sleep(3)

# try to insert city into not exists country

sendGet('api/database/city/insert?city_country_id=' + str(25) + "&city_name=city_" + str(1))
sendGet('api/database/city/insert?city_country_id=' + str(26) + "&city_name=city_" + str(2))	
sendGet('api/database/city/insert?city_country_id=' + str(27) + "&city_name=city_" + str(3))	

nl()
nl()
time.sleep(3)	

# add houses

citiesAll = 825
housesStart = 5

for i in range(1, citiesAll + 1):
	for k in range(1, housesStart + (i % 5) + 1):
		sendGet('api/database/house/insert?house_city_id=' + str(i) + "&house_name=house_" + str(k) + "_cit_" + str(i))

nl()
nl()
time.sleep(3)	

# try insert house into not exists city

for i in range(1000, 1500 + 1):
	for k in range(1, housesStart + (i % 2) + 1):
		sendGet('api/database/house/insert?house_city_id=' + str(i) + "&house_name=house_" + str(k) + "_cit_" + str(i))

nl()
nl()
time.sleep(3)

# insert departments to houses

houseNumber = 5775

for i in range(1, houseNumber + 1):
	for k in range(1, 3 + 1):
		sendGet('api/database/department/insert?department_house_id=' + str(i) + "&department_name=depart_" + str(k) + "_hous_" + str(i))

nl()
nl()
time.sleep(3)

# insert departments to not exists houses

for i in range(8000, 9000 + 1):
	for k in range(1, 1 + 1):
		sendGet('api/database/department/insert?department_house_id=' + str(i) + "&department_name=depart_" + str(k) + "_hous_" + str(i))


nl()
nl()
time.sleep(3)

# add people to departments

departmentsNumber = 17325

for i in range(1, departmentsNumber + 1):
	for k in range(1, 2 + (i % 4) + 1):
		sendGet('api/database/people/insert?people_fio=people_' + str(k) + '_depart_' + str(i) + "&people_department_id=" + str(i))

nl()
nl()
time.sleep(3)
		
# exit

nl()
nl()
print("Press ENTER to exit ...  ")
exitString = raw_input()



