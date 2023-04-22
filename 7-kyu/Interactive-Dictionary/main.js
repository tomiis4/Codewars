class Dictionary {
  food = {};
  constructor() {
  }
  
  newEntry(key, value) {
    this.food[key] = value;
  }
  
  look(key) {
    return this.food[key] ?? `Can't find entry for ${key}`
  }
}
