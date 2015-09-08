# Bitmask

This README is being developed! The code is not ready for production use yet.

## What is bitmask?

A bit mask is a binary number or a bitmap where the desired bit(s) are one and the remaining 0. By performing a bitwise 
AND operation of a value with a bitmask, one can test for certain bits being on.

Using a bitmask, it is very easy to store the boolean status of multiple flags in a single variable (of higher base.) A
very common use case is to store "permission" value for an object. For example, whether an entity has read or write
permission to an object can be determined easily by storing two flags "read" and "write" within a single variable.