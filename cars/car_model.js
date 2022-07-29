class Car {
    constructor(license_plate,
                brand = "DEFAULT_VALUE",
                model = "DEFAULT_VALUE",
                codename = "DEFAULT_VALUE",
                year = 1901,
                comment = "DEFAULT_VALUE",
                is_new = 1) {
        this.license_plate = license_plate;
        this.brand = brand;
        this.model = model;
        this.codename = codename;
        this.year = year;
        this.comment = comment;
        this.is_new = is_new;
    }

    info() {
        return [this.license_plate, this.brand, this.model, this.codename, this.year, this.comment, this.is_new]
    }
}

module.exports = {
    Car
}