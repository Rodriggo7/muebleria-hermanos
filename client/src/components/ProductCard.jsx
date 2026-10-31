import { memo, useMemo } from "react";
import Button from "./Button";

function ProductCard({
  id,
  image,
  name,
  price,
  onAddToCart,
  imageAlt,
  currency = "ARS",
  locale = "es-AR",
}) {
  const titleId = `product-${id}-title`;

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat(locale, { style: "currency", currency }).format(
        Number(price) || 0,
      ),
    [price, currency, locale],
  );

  const handleAddToCart = () => onAddToCart?.(id);

  return (
    <article className="card" aria-labelledby={titleId}>
      <div className="imageWrapper">
        <img
          src={image}
          alt={imageAlt ?? name}
          className="image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="body">
        <h3 id={titleId} className="name" title={name}>
          {name}
        </h3>

        <p className="price">
          <data value={price}>{formattedPrice}</data>
        </p>

        <div className="action">
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            aria-label={`Agregar ${name} al carrito`}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
