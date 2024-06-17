class Key {
  private signature: number = Math.floor(Math.random() * 1000);
  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {
    console.log(
      `Person with key '${this.getKey().getSignature()}' has been created.`
    );
  }

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  private tenants: Person[] = [];

  comeIn(person: Person) {
    if (!this.door) {
      console.log(`Sorry, seems you got the wrong key!`);
      return;
    }
    this.tenants.push(person);
    console.log('Please come in.');
    this.door = false;
    console.log(
      `Please don't forget to close the door after come in.\nThe door is closed.`
    );
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(protected key: Key) {
    super();
  }

  openDoor(key: Key): void {
    console.log(
      `Person with key '${key.getSignature()}' trying to open the door with key '${this.key.getSignature()}'.`
    );

    if (key.getSignature() == this.key.getSignature()) {
      this.door = true;
    }
    console.log(`The door is ${this.door ? 'open' : 'closed'}.`);
  }
}

const key = new Key();
const key2 = new Key();

const house = new MyHouse(key);

const person = new Person(key);
const person2 = new Person(key2);

console.log('---------------');

house.openDoor(person.getKey());
house.comeIn(person);

console.log('---------------');

house.openDoor(person2.getKey());
house.comeIn(person2);

console.log('---------------');

const house2 = new MyHouse(key2);

house2.openDoor(person2.getKey());
house2.comeIn(person2);

export {};
