import { APIHost } from "../utils/constants";

enum APIService {
  auth,
  apiAdmin,
  vendor,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/api/authentication`;
  } else if (service === APIService.apiAdmin) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  }

  return "";
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  // location: `${getBaseUrl(APIService.public)}/location`,
  // userProfile: `${getBaseUrl(APIService.public)}/user`,
  category: `${getBaseUrl(APIService.public)}/categories/list`,
  photo: "https://jsonplaceholder.typicode.com/photos",
  pruductList: `${getBaseUrl(APIService.public)}/products/list`,
  admins: `${getBaseUrl(APIService.apiAdmin)}/users/list`,
  createAdmin: `${getBaseUrl(APIService.apiAdmin)}/users/create`,
  brandsList: `${getBaseUrl(APIService.apiAdmin)}/brands/list`,
  vendorsList: `${getBaseUrl(APIService.apiAdmin)}/vendors/list`,
  commonsRole: `${getBaseUrl(APIService.apiAdmin)}/commons/role`,
  commonsCountry: `${getBaseUrl(APIService.apiAdmin)}/commons/country`,
  commonsState: `${getBaseUrl(APIService.apiAdmin)}/commons/state`,
  profileDetail: `${getBaseUrl(APIService.vendor)}/profile/detail`,
  usersList: `${getBaseUrl(APIService.apiAdmin)}/users/list`,
  usersCreate: `${getBaseUrl(APIService.apiAdmin)}/users/create`,
  usersEdit: `${getBaseUrl(APIService.apiAdmin)}/users/edit`,
  productsCreate: `${getBaseUrl(APIService.apiAdmin)}/products/create`,
  conditionsList: `${getBaseUrl(APIService.apiAdmin)}/conditions/list`,
  shippingsList: `${getBaseUrl(APIService.apiAdmin)}/shipping/list`,
  categoriesList: `${getBaseUrl(APIService.public)}/categories/list`,
  productsEdit: `${getBaseUrl(APIService.apiAdmin)}/products/edit`,
  uploadImageFile: `${getBaseUrl(APIService.public)}/products/upload-image`,
  productDetail: `${getBaseUrl(APIService.apiAdmin)}/products/detail`,
};
