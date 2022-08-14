class Car {
    constructor(license_plate,
                brand_id = 1,
                model = "DEFAULT_VALUE",
                codename = "DEFAULT_VALUE",
                year = 1901,
                comment = "DEFAULT_VALUE",
                is_new = 1,
                brand = "DEFAULT_VALUE") {
        this.license_plate = license_plate;
        this.brand_id = brand_id;
        this.model = model;
        this.codename = codename;
        this.year = year;
        this.comment = comment;
        this.is_new = is_new;
        this.brand = brand;
    }

    info() {
        return [this.license_plate, this.brand, this.model, this.codename, this.year, this.comment, this.is_new]
    }
}

module.exports = {
    Car
}