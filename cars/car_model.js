class Car {
    constructor(license_plate,
                brand = "nope",
                model = "nope",
                codename = "nope",
                year = 1901,
                comment = "nope") {
        this.license_plate = license_plate;
        this.brand = brand;
        this.model = model;
        this.codename = codename;
        this.year = year;
        this.comment = comment;
    }

    info() {
        return [this.license_plate, this.brand, this.model, this.codename, this.year, this.comment]
    }
}

module.exports = {
    Car
}