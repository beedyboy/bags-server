const db = require("../db/db");
class SearchDAO {
  recommend(data) {
    const { id, category, product_name, sub_id, brand_id, brandName } = data; 
    const subquery = db("products as p")
      .where((query) => {
        if (category) {
          query.where("p.category", category);
        }
        if (brand_id) {
          query.where("p.brand_id", brand_id);
        }
        if (sub_id) {
          query.where("p.sub_id", sub_id);
        }
        if (brandName) {
          query.orWhere("p.description", "like", `%${brandName}%`);
        }
        if (product_name) {
          query.orWhere("p.product_name", "like", `%${product_name}%`);
        }
      })
      .whereNot("p.id", id)
      .leftOuterJoin("brands as b", function () {
        this.on("p.brand_id", "=", "b.id");
      })
      .leftOuterJoin("subcategories as s", function () {
        this.on("p.sub_id", "=", "s.id");
      })
      .select("p.*", "b.name as brandName", "s.name as subName");

    return subquery;
  }

  search(data) {
    const { id, category, product_name, sub_id, brand_id, brandName } = data;
    const query = {
      "p.category": category,
      ...(sub_id && { "p.sub_id": sub_id }),
      ...(product_name && { "p.product_name": product_name }),
      ...(sub_id && { "p.sub_id": sub_id }),
    };

    const orQuery = {
      "p.category": category,
      ...(brandName && { "p.description": new RegExp(brandName, "i") }),
      ...(brand_id && { "p.brand_id": brand_id }),
    };
    console.log({ query });
    console.log({ orQuery });

    const subquery = db("products as p").where((query) => {
      query.where(orQuery).orWhere("p.id", ">", 10);
    });
    // .orWhere({product_name: 'Tester'})
    //   .from("products as p")
    //   .where(query)
    //   .whereNot('p.id', id)
    //   .orWhere(orQuery)
    //   .leftOuterJoin("brands as b", function () {
    //     this.on("p.brand_id", "=", "b.id");
    //   })
    //   .leftOuterJoin("subcategories as s", function () {
    //     this.on("p.sub_id", "=", "s.id");
    //   })
    //   .select("p.*", "b.name as brandName", "s.name as subName");

    // const result = db.from('accounts').where('id', 'not in', subquery)
    return subquery.toSQL();
  }
}

module.exports = new SearchDAO();
