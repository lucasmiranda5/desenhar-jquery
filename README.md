# Plugin para desenhar em DIV com jQuery e Bootstrap

Plugin com a função de criar um espaço para desenhar em Canvas em uma div com opções de tamanho de pincel e borracha e escolha de cor

## Pré-requisitos

Para o funcionamento do plugin é necessário ter instalado o [jQuery](http://jquery.com/), [Bootstrap 3](http://getbootstrap.com/docs/3.3) e [Color Picker Bootstrap](https://github.com/farbelous/bootstrap-colorpicker)

## Instalação

Primeira coisa é chamar as bibliotecas JS Bootstrap Color Picker e Desenha Jquery

```
<link rel="stylesheet" type="text/css" href="bootstrap-colorpicker.min.css">
<script src="bootstrap-colorpicker.min.js"></script>
<script src="desenharJquery.js"></script>
```

## Como usar
a função `.Desenhar` espera 3 parâmetros `.Desenhar(idCanvas,width,height)` 
* **idCanvas** - Nome do canvas que ele irar Criar (OBRIGATÓRIO)
* **width** - Largura do espaço para desenho (caso fique em branco ele irar pegar o tamanho da div que o plugin está sendo aplicado)
* **height** - Altura do espaço para desenho (caso fique em branco ele irar pegar o tamanho da div que o plugin está sendo aplicado)

## Exemplo
`$('#divCanvas').Desenhar('canvasN1',400,200)`

Para ver as demos acesse o site [http://lucasmiranda.com.br/desenharJquery](http://lucasmiranda.com.br/desenharJquery)

## Versão

Versão atual 1.0.0

## Desenvolvidor por

Desenvolvido e mantido por [Lucas Miranda](http://lucasmiranda.com.br)

## License
This project is licensed under the MIT License


