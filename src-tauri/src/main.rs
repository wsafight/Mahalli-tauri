#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod db;

use db::establish_connection;
use migration::{Migrator, MigratorTrait};
use service::sea_orm::DatabaseConnection;

pub struct AppState {
    db_conn: DatabaseConnection,
}

#[tokio::main]
async fn main() {
    // establish conn
    let db_conn = establish_connection().await;
    // run migrations
    Migrator::up(&db_conn, None).await.unwrap();
    //
    tauri::Builder::default()
        .manage(AppState { db_conn })
        .invoke_handler(tauri::generate_handler![
            //
            // products
            //
            commands::products::list_products,
            commands::products::search_products,
            commands::products::create_product,
            commands::products::update_product,
            commands::products::delete_product,
            //
            // inventory
            //
            commands::inventory::create_inventory,
            commands::inventory::update_inventory,
            commands::inventory::delete_inventory,
            //
            // clients
            //
            commands::clients::list_clients,
            commands::clients::search_clients,
            commands::clients::create_client,
            commands::clients::update_client,
            commands::clients::delete_client,
            //
            // suppliers
            //
            commands::suppliers::list_suppliers,
            commands::suppliers::search_suppliers,
            commands::suppliers::create_supplier,
            commands::suppliers::update_supplier,
            commands::suppliers::delete_supplier,
            //
            // orders
            //
            commands::orders::list_orders,
            commands::orders::get_order,
            commands::orders::create_order,
            commands::orders::update_order,
            commands::orders::delete_order,
            commands::orders::list_order_products,
            //
            // order items
            //
            commands::order_items::create_order_item,
            commands::order_items::update_order_item,
            commands::order_items::delete_order_item,
            //
            // invoices
            //
            commands::invoices::list_invoices,
            commands::invoices::get_invoice,
            commands::invoices::create_invoice,
            commands::invoices::update_invoice,
            commands::invoices::delete_invoice,
            commands::invoices::list_invoice_products,
            //
            // invoice items
            //
            commands::invoice_items::create_invoice_item,
            commands::invoice_items::update_invoice_item,
            commands::invoice_items::delete_invoice_item,
        ])
        .plugin(tauri_plugin_oauth::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
