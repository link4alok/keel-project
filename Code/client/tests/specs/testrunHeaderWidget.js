require(
	[
	  'app/domain/Repository',
	  'app/widgets/header/HeaderWidget'
	],
	function (Repository, HeaderWidget) {
		'use strict';
		describe('HeaderWidget', function(){
            it("Signout should be able to clear sessionStorage", function(){
                var name = "Dummy Name";
                var memInfo = JSON.stringify(sessionStorage.setItem('userInform', name));
                var headerInstance = new HeaderWidget();
                headerInstance.signOut();
                expect(memInfo).to.equal(undefined);
            });
        });
	});