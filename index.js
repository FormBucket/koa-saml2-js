// Create service provider
var saml2 = require("saml2-js");

/*
var saml2 = SAML2({ sp_options, idp_options })
router.get('/metadata.xml', saml2.metadata);
router.get('/saml/login', saml2.login);
*/

const koaSaml2 = ({ sp_options, idp_options }) => {
  var sp = new saml2.ServiceProvider(sp_options);
  var idp = new saml2.IdentityProvider(idp_options);

  function create_login_request_url() {
    return new Promise((resolve, reject) => {
      create_login_request_url(idp, {}, function(err, login_url, request_id) {
        if (err != null) reject(err);
        resolve(login_url);
      });
    });
  }

  async function post_assert(options) {
    return new Promise((resolve, reject) => {
      sp.post_assert(idp, options, function(err, saml_response) {
        if (err != null) reject(err);
        resolve(saml_response);
      });
    });
  }

  async function create_login_request_url(options) {
    return new Promise((resolve, reject) => {
      sp.create_logout_request_url(idp, options, function(err, logout_url) {
        if (err != null) reject(err);
        resolve(logout_url);
      });
    });
  }

  return {
    metadata: async ctx => {
      ctx.type = "application/xml";
      ctx.body = sp.create_metadata();
    },
    login: async ctx => {
      var login_url = await create_login_request_url();
      ctx.redirect(login_url);
    },
    assert: async ctx => {
      if (!ctx.session) {
        throw new Error("ctx.session must be configured. See koa-session.");
      }
      var options = { request_body: req.body };
      var saml_response = await postAssert(options);
      ctx.session.user = saml_response.user;
      ctx.body = "Hello #{saml_response.user.name_id}!";
    },
    logout: async ctx => {
      var options = {
        name_id: name_id,
        session_index: session_index
      };

      var logout_url = await create_login_request_url(options);
      ctx.redirect(logout_url);
    }
  };
};

export default koaSaml2;
