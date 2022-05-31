const Esercizio1 = artifacts.require("Esercizio1");


contract("Esercizio1", (accounts) => {
  before(async () =>{
     // deploy contratto nella blockchaon virtuale in memoria
      instance = await Esercizio1.deployed();
  })

  /* Invoca metodo contratto e testa se il valori iniziali sono Come
  dovrebbero essere, ossia se è tutto ok. */
  it('Il valore iniziale dovrebbe essere', async() =>{
      let value = await instance.getValue(); // Invoca il metodo getValue del contratto
      assert.equal(value, 0, "Il valore iniziale dovrebbe essere 0");
  })


})
