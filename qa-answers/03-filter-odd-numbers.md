Input: `[1, 22, 4, 23, 10, 90, 8]`
Output (odd numbers): `[1, 23]`

## Pseudo code
# If you want to print odd numbers
FUNCTION filterodd(numbers)
    result <- empty array
    FOR EACH n IN numbers
        IF n MOD 2 != 0 THEN
            append n to result
        END IF
    END FOR
    RETURN result
    PRINT result
END FUNCTION

filterodd([1, 22, 4, 23, 10, 90, 8])
