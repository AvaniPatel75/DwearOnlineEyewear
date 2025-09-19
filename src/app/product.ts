export class Product {

        _id!: string;
        brand!: string;
        product_id!: number;
        product_type!: string;
        frame_type!: string;
        frame_shape!: string;
        model_no!: string;
        frame_size!: string;
        frame_width!: number;
        frame_dimensions!: string;
        frame_color!: string;
        weight!: number;
        weight_group!: string;
        material!: {
          overall: string;
          frame_material: string;
          temple_material: string;
        };
        prescription_type!: string;
        frame_style!: string;
        frame_style_secondary!: string;
        image_url!: string;
        additional_images?: string[];
        price!: number;
        created_at!: Date;
        updated_at!: Date;
        stock_quantity!: number;
        rating!: number;
        reviews_count!: number;
        available_colors!: {
          color_id?: number;
          colorName?: string;
          colorImage?: string[];
        }[];
        is_active!: boolean;
        gender!: string;
        offer!:number
      
       
      
}
