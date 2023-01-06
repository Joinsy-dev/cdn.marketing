validarCNPJ = (cnpj) => {

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
};

addFieldIfNotExists = (selectorField, element) => {
  if (jQuery(selectorField).length === 0) {
    const element_ = jQuery(element).parent().clone();
    element_.find(`input`).remove();

    element_.append(
      jQuery(`<div>`, { class: "_html-code" }).append(
        jQuery(`<p>`, { class: "invalidCNPJ" }).append(`<b>`, {
          text: `CNPJ Inválido. Digite apenas os números.`,
        })
      )
    );

    jQuery(element).parent().before(element_);
  }
};

injectScript = () => {
  const interval = setInterval(() => {
    try {
      if (typeof jQuery === "undefined")
        throw new Error("jQuery is not defined");
        
        $('body').on("focusout", '[data-name="cnpj"],[data-name="fullname"],[data-name="phone"]', (element) => {
        
          const name = jQuery('[data-name="fullname"]').val();
          if( name.match(/[^a-zA-Z ]/) != null ){
            jQuery('._submit').attr('disabled', true)
            return;
          }
          
          
          const fone = jQuery('[data-name="phone"]').val().split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
          if( fone.length === 11 ? fone.match(/(\d{2})(\d{5})(\d{4})/) : fone.match(/(\d{2})(\d{4})(\d{4})/) == null ){
            jQuery('._submit').attr('disabled', true)
            return;
          }
          
          
          
          
        const cnpj = jQuery('[data-name="cnpj"]').val().split('.').join('').split('/').join('').split('-').join('');
        
        addFieldIfNotExists(`.invalidCNPJ`, element.currentTarget);

        if (!validarCNPJ(cnpj)) {
          jQuery('._submit').attr('disabled', true)
          return jQuery(element.currentTarget)
            .parent()
            .parent()
            .find(".invalidCNPJ")
            .show();
        }

        if (cnpj === "") {
          jQuery('._submit').attr('disabled', true)
          return jQuery(element.currentTarget)
            .parent()
            .parent()
            .find(".invalidCNPJ")
            .show();
        }

        if (cnpj.length != 14) {
          jQuery('._submit').attr('disabled', true)
          return jQuery(element.currentTarget)
            .parent()
            .parent()
            .find(".invalidCNPJ")
            .show();
        }

        if (!validarCNPJ(cnpj)) {
          jQuery('._submit').attr('disabled', true)
          return jQuery(element.currentTarget)
            .parent()
            .parent()
            .find(".invalidCNPJ")
            .show();
        }
        jQuery('._submit').removeAttr( 'disabled' )
      });
      console.log('COMPLETE')
      clearInterval(interval);
    } catch (error) {
      console.log(error);
      console.log(`ignore`);
    }
  }, 500);
};

injectScript();
