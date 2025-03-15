import {normalisePrice} from '../backend/utils.js'


describe('Test suites for utils', () =>{
  describe('Test suite: normalizePrice', ()=> {
    describe('Base cases', () =>{
      it('spec: 2095', () => {
        expect(normalisePrice(2095)).toBe('20.95');
      })
    })
    
    
    describe('Edge cases', ()=> {
      it('Testing for 0', () => {
        expect(normalisePrice(0)).toBe('0.00');
      })

      it('Testing for 2000.4', () => {
        expect(normalisePrice(2000.4)).toBe('20.00');
      })
    })
  })
})