const Camera = require('../models/camera');
const Recorder = require('../models/recorder');
const InstallationCost = require('../models/installation_cost');
const Accessory = require('../models/accessory');
const Cable = require('../models/cable');
const CableProtection = require('../models/cable_protection');
const CompanyInfo = require('../models/company');
const Product = require('../models/product');

// Dashboard principal
exports.getDashboard = (req, res) => {
    res.render('public/dashboard/dashboard', {
        title: 'Panel de Control',
        layout: 'layouts/dashboard'
    });
};

exports.getManageCameras = (req, res, next) => {
    Camera.getAll((err, cameras) => {
        if (err) {
            console.error('Error al obtener cámaras:', err);
            return next(err);
        }
        res.render('public/dashboard/manage_cameras', { 
            title: 'Gestionar Cámaras',
            cameras: cameras || [],
            csrfToken: req.csrfToken() // Aseguramos que el token CSRF esté disponible
        });
    });
};

// Gestión de grabadores
exports.getManageRecorders = (req, res) => {
    res.render('manage_recorders', {
        layout: false,
        title: 'Gestionar Grabadores'
    });
};

// Gestión de instalación
exports.getManageInstallation = (req, res) => {
    res.render('manage_installation', {
        layout: false,
        title: 'Gestionar Instalación'
    });
};

// Gestión de accesorios
exports.getManageAccessories = (req, res) => {
    res.render('manage_accessories', {
        layout: false,
        title: 'Gestionar Accesorios'
    });
};

// Gestión de cables
exports.getManageCables = (req, res) => {
    res.render('manage_cables', {
        layout: false,
        title: 'Gestionar Cables'
    });
};

// Gestión de protección
exports.getManageProtection = (req, res) => {
    res.render('manage_protection', {
        layout: false,
        title: 'Protección de Cables'
    });
};

// Gestión de cotizaciones
exports.getQuotes = (req, res) => {
    res.render('quotes', {
        layout: false,
        title: 'Ver Cotizaciones'
    });
};

// Información de la empresa
exports.getCompanyInfo = (req, res) => {
    res.render('company_info', {
        layout: false,
        title: 'Información de la Empresa'
    });
};

exports.addCamera = (req, res, next) => {
    const { model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price } = req.body;
    const camera = new Camera(model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price);
    camera.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_cameras');
    });
};

exports.editCamera = (req, res, next) => {
    const id = req.params.id;
    Camera.getById(id, (err, camera) => {
        if (err) return next(err);
        if (!camera) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Cámara no encontrada' 
        });
        res.render('edit_camera', { 
            title: 'Editar Cámara', 
            layout: 'partials/layout',
            req: req,
            camera 
        });
    });
};

exports.updateCamera = (req, res, next) => {
    const id = req.params.id;
    const { model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price } = req.body;
    const camera = new Camera(model, mp, usage, material, type, ir_color, audio, ir_range, connection, ai, price);
    camera.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_cameras');
    });
};

exports.deleteCamera = (req, res, next) => {
    const id = req.params.id;
    Camera.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_cameras');
    });
};

exports.getManageRecorders = (req, res, next) => {
    Recorder.getAll((err, recorders) => {
        if (err) return next(err);
        res.render('manage_recorders', { 
            title: 'Gestionar Grabadores', 
            layout: 'partials/layout',
            req: req,
            recorders: recorders || [] 
        });
    });
};

exports.addRecorder = (req, res, next) => {
    const { model, channels, resolution, technology, price } = req.body;
    const recorder = new Recorder(model, channels, resolution, technology, price);
    recorder.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_recorders');
    });
};

exports.editRecorder = (req, res, next) => {
    const id = req.params.id;
    Recorder.getById(id, (err, recorder) => {
        if (err) return next(err);
        if (!recorder) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Grabador no encontrado' 
        });
        res.render('edit_recorder', { 
            title: 'Editar Grabador', 
            layout: 'partials/layout',
            req: req,
            recorder 
        });
    });
};

exports.updateRecorder = (req, res, next) => {
    const id = req.params.id;
    const { model, channels, resolution, technology, price } = req.body;
    const recorder = new Recorder(model, channels, resolution, technology, price);
    recorder.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_recorders');
    });
};

exports.deleteRecorder = (req, res, next) => {
    const id = req.params.id;
    Recorder.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_recorders');
    });
};

exports.getManageInstallation = (req, res, next) => {
    InstallationCost.getAll((err, costs) => {
        if (err) return next(err);
        res.render('manage_installation', { 
            title: 'Gestionar Costos de Instalación', 
            layout: 'partials/layout',
            req: req,
            costs: costs || [] 
        });
    });
};

exports.addInstallationCost = (req, res, next) => {
    const { condition, price } = req.body;
    const cost = new InstallationCost(condition, price);
    cost.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_installation');
    });
};

exports.editInstallationCost = (req, res, next) => {
    const id = req.params.id;
    InstallationCost.getById(id, (err, cost) => {
        if (err) return next(err);
        if (!cost) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Costo de instalación no encontrado' 
        });
        res.render('edit_installation', { 
            title: 'Editar Costo de Instalación', 
            layout: 'partials/layout',
            req: req,
            cost 
        });
    });
};

exports.updateInstallationCost = (req, res, next) => {
    const id = req.params.id;
    const { condition, price } = req.body;
    const cost = new InstallationCost(condition, price);
    cost.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_installation');
    });
};

exports.deleteInstallationCost = (req, res, next) => {
    const id = req.params.id;
    InstallationCost.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_installation');
    });
};

exports.getManageAccessories = (req, res, next) => {
    Accessory.getAll((err, accessories) => {
        if (err) return next(err);
        res.render('manage_accessories', { 
            title: 'Gestionar Accesorios', 
            layout: 'partials/layout',
            req: req,
            accessories: accessories || [] 
        });
    });
};

exports.addAccessory = (req, res, next) => {
    const { name, price } = req.body;
    const accessory = new Accessory(name, price);
    accessory.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_accessories');
    });
};

exports.editAccessory = (req, res, next) => {
    const id = req.params.id;
    Accessory.getById(id, (err, accessory) => {
        if (err) return next(err);
        if (!accessory) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Accesorio no encontrado' 
        });
        res.render('edit_accessory', { 
            title: 'Editar Accesorio', 
            layout: 'partials/layout',
            req: req,
            accessory 
        });
    });
};

exports.updateAccessory = (req, res, next) => {
    const id = req.params.id;
    const { name, price } = req.body;
    const accessory = new Accessory(name, price);
    accessory.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_accessories');
    });
};

exports.deleteAccessory = (req, res, next) => {
    const id = req.params.id;
    Accessory.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_accessories');
    });
};

exports.getManageCables = (req, res, next) => {
    Cable.getAll((err, cables) => {
        if (err) return next(err);
        res.render('manage_cables', { 
            title: 'Gestionar Cables', 
            layout: 'partials/layout',
            req: req,
            cables: cables || [] 
        });
    });
};

exports.addCable = (req, res, next) => {
    const { type, category, price_per_meter } = req.body;
    const cable = new Cable(type, category, price_per_meter);
    cable.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_cables');
    });
};

exports.editCable = (req, res, next) => {
    const id = req.params.id;
    Cable.getById(id, (err, cable) => {
        if (err) return next(err);
        if (!cable) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Cable no encontrado' 
        });
        res.render('edit_cable', { 
            title: 'Editar Cable', 
            layout: 'partials/layout',
            req: req,
            cable 
        });
    });
};

exports.updateCable = (req, res, next) => {
    const id = req.params.id;
    const { type, category, price_per_meter } = req.body;
    const cable = new Cable(type, category, price_per_meter);
    cable.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_cables');
    });
};

exports.deleteCable = (req, res, next) => {
    const id = req.params.id;
    Cable.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_cables');
    });
};

exports.getManageProtection = (req, res, next) => {
    CableProtection.getAll((err, protections) => {
        if (err) return next(err);
        res.render('manage_protection', { 
            title: 'Gestionar Protección de Cables', 
            layout: 'partials/layout',
            req: req,
            protections: protections || [] 
        });
    });
};

exports.addProtection = (req, res, next) => {
    const { type, capacity, price_per_2m } = req.body;
    const protection = new CableProtection(type, capacity, price_per_2m);
    protection.save((err) => {
        if (err) return next(err);
        res.redirect('/manage_protection');
    });
};

exports.editProtection = (req, res, next) => {
    const id = req.params.id;
    CableProtection.getById(id, (err, protection) => {
        if (err) return next(err);
        if (!protection) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Protección de cable no encontrada' 
        });
        res.render('edit_protection', { 
            title: 'Editar Protección de Cable', 
            layout: 'partials/layout',
            req: req,
            protection 
        });
    });
};

exports.updateProtection = (req, res, next) => {
    const id = req.params.id;
    const { type, capacity, price_per_2m } = req.body;
    const protection = new CableProtection(type, capacity, price_per_2m);
    protection.update(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_protection');
    });
};

exports.deleteProtection = (req, res, next) => {
    const id = req.params.id;
    CableProtection.delete(id, (err) => {
        if (err) return next(err);
        res.redirect('/manage_protection');
    });
};

exports.getCompanyInfo = (req, res, next) => {
    CompanyInfo.get((err, company) => {
        if (err) return next(err);
        if (!company) return res.status(404).render('error', { 
            title: 'Error', 
            layout: 'partials/layout',
            req: req,
            message: 'Información de la empresa no encontrada' 
        });
        res.render('company_info', { 
            title: 'Editar Información de la Empresa', 
            layout: 'partials/layout',
            req: req,
            company: company[0] 
        });
    });
};

exports.updateCompanyInfo = (req, res, next) => {
    const { city, date, name, phone, email, website } = req.body;
    CompanyInfo.update(city, date, name, phone, email, website, (err) => {
        if (err) return next(err);
        res.redirect('/company_info');
    });
};

exports.getProducts = (req, res, next) => {
    // Obtener todos los productos de diferentes categorías
    const getProducts = async () => {
        try {
            const [cameras, recorders, accessories, cables, protections] = await Promise.all([
                new Promise((resolve, reject) => {
                    Camera.getAll((err, data) => err ? reject(err) : resolve(data));
                }),
                new Promise((resolve, reject) => {
                    Recorder.getAll((err, data) => err ? reject(err) : resolve(data));
                }),
                new Promise((resolve, reject) => {
                    Accessory.getAll((err, data) => err ? reject(err) : resolve(data));
                }),
                new Promise((resolve, reject) => {
                    Cable.getAll((err, data) => err ? reject(err) : resolve(data));
                }),
                new Promise((resolve, reject) => {
                    CableProtection.getAll((err, data) => err ? reject(err) : resolve(data));
                })
            ]);

            res.render('products', {
                title: 'Productos',
                layout: 'partials/layout',
                req: req,
                cameras: cameras || [],
                recorders: recorders || [],
                accessories: accessories || [],
                cables: cables || [],
                protections: protections || []
            });
        } catch (err) {
            next(err);
        }
    };

    getProducts();
};

exports.getDashboardProducts = (req, res, next) => {
    Product.getAll((err, products) => {
        if (err) return next(err);
        res.render('dashboard_products', {
            title: 'Gestión de Productos de la Tienda',
            layout: 'partials/layout',
            req: req,
            products: products || []
        });
    });
}; // Add missing closing bracket

// Export all the controller functions
module.exports = {
    getDashboard: exports.getDashboard,
    getManageCameras: exports.getManageCameras,
    getManageRecorders: exports.getManageRecorders,
    getManageInstallation: exports.getManageInstallation,
    getManageAccessories: exports.getManageAccessories,
    getManageCables: exports.getManageCables,
    getManageProtection: exports.getManageProtection,
    getQuotes: exports.getQuotes,
    getCompanyInfo: exports.getCompanyInfo,
    addCamera: exports.addCamera,
    editCamera: exports.editCamera,
    updateCamera: exports.updateCamera,
    deleteCamera: exports.deleteCamera,
    addRecorder: exports.addRecorder,
    editRecorder: exports.editRecorder,
    updateRecorder: exports.updateRecorder,
    deleteRecorder: exports.deleteRecorder,
    addInstallationCost: exports.addInstallationCost,
    editInstallationCost: exports.editInstallationCost,
    updateInstallationCost: exports.updateInstallationCost,
    deleteInstallationCost: exports.deleteInstallationCost,
    addAccessory: exports.addAccessory,
    editAccessory: exports.editAccessory,
    updateAccessory: exports.updateAccessory,
    deleteAccessory: exports.deleteAccessory,
    addCable: exports.addCable,
    editCable: exports.editCable,
    updateCable: exports.updateCable,
    deleteCable: exports.deleteCable,
    addProtection: exports.addProtection,
    editProtection: exports.editProtection,
    updateProtection: exports.updateProtection,
    deleteProtection: exports.deleteProtection,
    updateCompanyInfo: exports.updateCompanyInfo,
    getProducts: exports.getProducts,
    getDashboardProducts: exports.getDashboardProducts
};