use std::fs;
use std::io::prelude::*;
use std::{
    error::Error,
    fs::{create_dir_all, File},
};

use lazy_static::lazy_static;
use tera::{Context, Tera};

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let tera = match Tera::new("templates/**/*.html") {
            Ok(t) => t,
            Err(e) => {
                println!("Parsing error(s): {}", e);
                ::std::process::exit(1);
            }
        };
        tera
    };
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut smithy_file = File::open("model/main.smithy")?;
    let mut code = String::new();
    smithy_file.read_to_string(&mut code)?;

    let mut context = Context::new();
    context.insert("code", &code);
    let html = TEMPLATES.render("index.html", &context)?;

    create_dir_all("dist")?;
    let mut html_file = File::create("dist/index.html")?;
    html_file.write_all(html.as_bytes())?;
    fs::copy("../../dist/hljs-smithy.min.js", "dist/hljs-smithy.min.js")?;
    Ok(())
}
