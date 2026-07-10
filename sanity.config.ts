'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from '@/sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'digitally-next',
  title: 'Digitally Next Blog',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Drag-to-reorder Employee Stories list (managed via `orderRank`).
            orderableDocumentListDeskItem({
              type: 'employeeStory',
              title: 'Employee Stories',
              S,
              context,
            }),
            S.divider(),
            // Everything else — the auto-generated document lists for the other types.
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'employeeStory'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
});
