---
name: product-ui
description: Review Petoria-next product types, enums, Apollo documents, filters, forms and cards for consistency with the Petoria API. Use after changing anything product-related in the frontend (apollo documents, libs/types/product, libs/enums/product.enum.ts, product pages/components) or after a backend product change.
---

# Petoria Product UI Review

Read-only review unless fixes are requested. Report findings as a table: file:line, issue, suggested fix.

## Source of Truth

The backend DTOs and enums in `../Petoria/apps/petoria-api/src/libs/{dto/product,enums/product.enum.ts}`.

| Item | Expected |
| --- | --- |
| `ProductType` | `PET`, `FOOD`, `TOY`, `ACCESSORY` |
| `ProductSpecies` | `DOG`, `CAT`, `BIRD`, `FISH` |
| `ProductGender` | `MALE`, `FEMALE` |
| `ProductStatus` | `ACTIVE`, `SOLD`, `DELETE` |
| `ProductLocation` | Korean city list |
| Owner role | `MemberType.AGENT` (labelled "Seller" in the UI) |

## Files

- `libs/enums/product.enum.ts`, `libs/enums/{like,view,comment,notification}.enum.ts` (`PRODUCT` group value)
- `libs/types/product/product.ts`, `product.input.ts`, `product.update.ts`
- `apollo/user/query.ts`, `apollo/user/mutation.ts`, `apollo/admin/query.ts`, `apollo/admin/mutation.ts`
- `libs/components/product/*` (`Filter`, `ProductCard`, `Review`), `libs/components/homepage/*Product*`, `libs/components/common/ProductBigCard.tsx`
- `libs/components/mypage/{AddNewProduct,MyProducts,ProductCard,MyFavorites,RecentlyVisited}.tsx`, `libs/components/member/MemberProducts.tsx`
- `libs/components/homepage/HeaderFilter.tsx`, `pages/product/{index,detail}.tsx`, `pages/_admin/products/index.tsx`, `libs/components/admin/products/ProductList.tsx`

## Checklist

1. **Enums**: frontend enum values equal the backend values. No extra or missing members.
2. **Types ↔ DTOs**: `Product`, `ProductInput`, `ProductUpdate`, `ProductsInquiry` (`PISearch`), `AgentProductsInquiry`, `AllProductsInquiry` have the same fields and optionality as the backend.
3. **Apollo documents**: every selected field exists on the schema, arguments use `productId`, and new backend fields are selected where the UI needs them. Validate against the live schema (see `frontend-migration` skill).
4. **Filters**: `HeaderFilter` and `product/Filter` only send `PISearch` fields (`locationList`, `typeList`, `speciesList`, `genderList`, `pricesRange`, `periodsRange`, `text`) and remove empty lists before `router.push`.
5. **Sorts**: sort values sent by product pages exist in the backend `availableProductSorts`.
6. **Form**: `AddNewProduct` sends every required `ProductInput` field (`productType`, `productSpecies`, `productGender`, `productLocation`, `productTitle`, `productPrice`, `productImages`) and respects `productTitle` 3–100 and `productDesc` 5–500 lengths.
7. **Cards / detail**: show type and species, show gender only for `PET`, show sale status from `productStatus`. No real-estate labels or icons (`bed.svg`, `room.svg`, `expand.svg`).
8. **Roles**: add/edit product and My Products are only reachable for `memberType === 'AGENT'`. Admin product pages use admin documents.
9. **Group enums**: likes, views and comments on products use `PRODUCT`.
10. **Naming**: no leftovers. Run:
    ```bash
    grep -rniE "propert|apartment|villa|bedroom|barter|for rent|constructedAt" libs pages apollo
    ```

## Output

Summarize: OK items, mismatches (with file:line) and recommended fixes ordered by impact. If fixes are applied, run `npx tsc --noEmit -p .` and `yarn build`.
