// SAML Middleware
// Author: JC Fisher
// Email: jcfisher007@gmail.com

/**
 * The ServiceProvider options.
 */
interface KoaSaml2SpOptions {
  entity_id: String;
  private_key: String;
  certificate: String;
  assert_endpoint: String;
}

/**
 * The IdentityProvider options.
 */
interface KoaSaml2IdsOptions {
  sso_login_url: String;
  sso_logout_url: String;
  certificates: Array<String>;
}

/**
 * The complete options configuration.
 */
interface KoaSaml2Input {
  sp_options: KoaSaml2SpOptions;
  ids_options: KoaSaml2IdpOptions;
}

/**
 * The middlewares returned.
 */
interface KoaSaml2Output {
  metadata(ctx): Promise<any>;
  login(ctx): Promise<any>;
  assert(ctx): Promise<any>;
  logout(ctx): Promise<any>;
}

/**
 * Generate SAML2 middleware.
 * @param options Parameters to configure the middleware.
 *
 * Example:
 *
 * var sp_options = {
 *  entity_id: "https://sp.example.com/metadata.xml",
 *  private_key: fs.readFileSync("key-file.pem").toString(),
 *  certificate: fs.readFileSync("cert-file.crt").toString(),
 *  assert_endpoint: "https://sp.example.com/assert"
 * };
 *
 * // Create identity provider
 * var idp_options = {
 *  sso_login_url: "https://idp.example.com/login",
 *  sso_logout_url: "https://idp.example.com/logout",
 *  certificates: [
 *   fs.readFileSync("cert-file1.crt").toString(),
 *   fs.readFileSync("cert-file2.crt").toString()
 *  ]
 * };
 *
 */
export default function koaSaml2(options: KoaSaml2Input): KoaSaml2Output;
