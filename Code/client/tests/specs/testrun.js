console.log('running');
require(
	[
	  'app/domain/Repository',
	  'app/widgets/toolbar/ToolbarWidget'
	],
	function (Repository, ToolbarWidget) {
	  console.log('.....');
	  console.log(ToolbarWidget);
	});
describe('test setup', function () {
    it("should succeed", function(){
    	expect(42).to.equal(42);
    });
});
