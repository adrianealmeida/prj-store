export class Constants {
  // ROUTES
  public static readonly PATH_EMPTY = '';
  public static readonly PATH_HOME = '';
  public static readonly PATH_PRODUCT = 'product';
  public static readonly PATH_ABOUT = 'about';

  public static readonly PRODUCT_DIALOG_WIDTH: string = '1500px';
  public static readonly PRODUCT_DIALOG_HEIGHT: string = '295px';

  public static readonly PRODUCT_TITLE_REGISTER = 'Cadastrar Produto';
  public static readonly PRODUCT_TITLE_EDIT = 'Editar Produto';

  public static readonly PRODUCT_REGISTER_SUCCESS: string =
    'Produto criado com sucesso!';
  public static readonly PRODUCT_EDITION_SUCCESS: string =
    'Produto editado com sucesso!';
  public static readonly PRODUCT_DELETION_SUCCESS: string =
    'Produto excluído com sucesso!';

  public static readonly PRODUCT_DELETE_DIALOG_TITLE: string =
    'Você deseja realmente excluir produto?';
  public static readonly PRODUCT_DELETE_DIALOG_SUBTITLE: string =
    'Deseja deletar o produto?';

  public static readonly PRODUCT_PLACEHOLDER_NAME: string =
    'Informe o nome do produto';
  public static readonly PRODUCT_PLACEHOLDER_CODE: string = 'Ex: 123456';
  public static readonly PRODUCT_PLACEHOLDER_DESCRIPTION: string =
    'Informe a descrição do produto';
  public static readonly PRODUCT_PLACEHOLDER_QUANTITY: string =
    'Informe a quantidade de produtos';
  public static readonly PRODUCT_PLACEHOLDER_VALUE: string =
    'Informe o valor do produto';

  public static readonly PRODUCT_NO_REGISTERED_DATA = 'Nenhum produto cadastrado';
  public static readonly PRODUCT_NOT_FOUND = 'Não há registros deste produto';

  public static readonly PRODUCT_NAME_MAX_LENGTH: number = 30;
  public static readonly PRODUCT_CODE_MAX_LENGTH: number = 10;
  public static readonly PRODUCT_DESCRIPTION_MAX_LENGTH: number = 45;
  public static readonly PRODUCT_VALUE_MAX_LENGTH: number = 6;
  public static readonly PRODUCT_QUANTITY_MAX_LENGTH: number = 6;

  public static readonly DIALOG_LOADING_WIDTH = '260px';
  public static readonly DIALOG_LOADING_ID = 'dlgLoading';

  public static readonly DELETE_DIALOG_WIDTH: string = '510px';
  public static readonly DELETE_DIALOG_SUBTITLE2: string = ' ?';
  public static readonly NO_ACTION_TXT: string = 'Cancelar';
  public static readonly YES_ACTION_TXT: string = 'Confirmar';
  public static readonly DELETE_DIALOG_YES_ACTION: string = 'Excluir';

  public static readonly NOT_NUMBER_REGEX = /[^0-9]/g;
}
