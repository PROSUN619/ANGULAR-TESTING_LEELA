describe('This is my first test', () => {
    let testVariable : any;

    beforeEach(() => {
        testVariable = {};
    })

    it('testVariable should be true', () => {
        //Arrange
        testVariable.a = true;
        
        //Act
        if (1==1){
            testVariable.a = true;
        }

        //Assert
        expect(testVariable.a).toBe(true);
    })

});