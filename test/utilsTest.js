import {normalisePrice} from '../backend/utils.js'


describe('Utils', () =>{
  describe('Test suite: normalizePrice', ()=> {
    describe('Base cases', () =>{
      it('2095 to be 20.95', () => {
        expect(normalisePrice(2095)).toBe('20.95');
      })
    })
    
    
    describe('Edge cases', ()=> {
      it('0 to be 0.00', () => {
        expect(normalisePrice(0)).toBe('0.00');
      })

      it('2000.4 to be 20.00', () => {
        expect(normalisePrice(2000.4)).toBe('20.00');
      })
    })
  })
})