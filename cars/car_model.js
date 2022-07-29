class Car {
    constructor(license_plate,
                brand = "DEFAULT_VALUE",
                model = "DEFAULT_VALUE",
                codename = "DEFAULT_VALUE",
                year = 1901,
                comment = "DEFAULT_VALUE") {
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