import Menu from '../models/menuModel.js';

//CRUD operations for menu
const getAllMenus = async (req, res) => {
  const menus = await Menu.find();
  res.status(200).json(menus);
}

const createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    const createdMenu = await menu.save();
    res.status(201).json(createdMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.json(menu);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//CRUD operations for category

const createCategory = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    menu.categorys.push(req.body);
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    res.json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    Object.assign(category, req.body);
    const savedMenu = await menu.save();
    res.json(savedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    menu.categorys.id(req.params.categoryId).remove();
    const savedMenu = await menu.save();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//CRUD operations for product

const createProduct = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    category.products.push(req.body);
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    const product = category.products.id(req.params.productId);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    const product = category.products.id(req.params.productId);
    Object.assign(product, req.body);
    const savedMenu = await menu.save();
    res.json(savedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId);
    const category = menu.categorys.id(req.params.categoryId);
    category.products.id(req.params.productId).remove();
    const savedMenu = await menu.save();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getAllMenus, createMenu, getMenu, updateMenu, deleteMenu, createCategory, getCategory, updateCategory, deleteCategory, createProduct, getProduct, updateProduct, deleteProduct };