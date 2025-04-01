class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(car) {
    this.#brand = car.brand;
    this.#model = car.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, ${(this.isTrunkOpen)? 'Trunk open' : 'Trunk closed'}`);
  }

  go() {
    if((this.speed+5 <= 200 && !this.isTrunkOpen)) {
      this.speed += 5;
    }
  }

  break() {
    if((this.speed-5) >= 0) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if(!this.speed) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}


class RaceCar extends Car{
  acceleration;

  constructor(raceCar) {
    super(raceCar);
    this.acceleration = raceCar.acceleration
  }

  go() {
    if(this.speed+5 <= 300) {
      this.speed += 5;
    }
  }

  openTrunk() {}
  closeTrunk() {}


}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

console.log(car1, car2);

car1.go();
car1.go();
car2.go();
car2.break();
car2.break();
car1.go();
car2.go();
car1.break();
car1.break();
car1.break();
car1.openTrunk();
car1.go();
car1.closeTrunk();
car1.go();
car1.displayInfo();
car2.displayInfo();
raceCar1.go();
raceCar1.go();
raceCar1.openTrunk();
raceCar1.displayInfo();