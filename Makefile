test:
	phantomjs --web-security=no  deps/jasmine/run_jasmine_test.coffee src/test.html
	phantomjs --web-security=no  deps/jasmine/run_jasmine_test.coffee src/test_comet.html

assets:
	python assets.py
