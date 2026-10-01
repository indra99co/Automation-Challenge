inputArray = [1, 22, 4, 23, 10, 90, 8]
result = empty array

FOR i = 0 to inputArray.length 
	IF inputArray[i] mod 2 IS NOT 0 THEN
		ADD inputArray[i] TO result
	END IF
END FOR

PRINT result
