#!/bin/bash
for test in test/*/* ; do     
	bun test $test; 
done
